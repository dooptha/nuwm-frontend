//
//  TodayViewController.swift
//  ScheduleWidget
//
//  Created by Roman Sereda on 8/3/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit
import NotificationCenter

import Alamofire
import SwiftyJSON

struct Subject: Equatable {
  var time: String
  var name: String
  var classroom: String
  var date: Date
}

@IBDesignable class PaddingLabel: UILabel {
  
  @IBInspectable var topInset: CGFloat = 5.0
  @IBInspectable var bottomInset: CGFloat = 5.0
  @IBInspectable var leftInset: CGFloat = 16.0
  @IBInspectable var rightInset: CGFloat = 16.0
  
  override func drawText(in rect: CGRect) {
    let insets = UIEdgeInsets.init(top: topInset, left: leftInset, bottom: bottomInset, right: rightInset)
    super.drawText(in: rect.inset(by: insets))
  }
  
  override var intrinsicContentSize: CGSize {
    let size = super.intrinsicContentSize
    return CGSize(width: size.width + leftInset + rightInset,
                  height: size.height + topInset + bottomInset)
  }
}

enum Action{
  case updateTable, noLesson, noServer, loading, wakeUpMessage, lessonsEnded, noUpdate
}

extension String {
  
  public func localized(with arguments: [CVarArg]) -> String {
    return String(format: self.localized, locale: nil, arguments: arguments)
  }
  
  var localized: String {
    return NSLocalizedString(self, tableName: nil, bundle: Bundle.main, value: "", comment: "")
  }
}

class TodayViewController: UITableViewController, NCWidgetProviding {
  
  var data: Array<Subject> = Array()
  var subjects: Array<Subject>? = Array()
  var mode: NCWidgetDisplayMode?
  var tomorrowCampus: String?
  var thereWasLessonsToday: Bool = false
  var currentAction: Action = .loading
  var tomorrowTime: String?
  let url: String = "https://api.dooptha.com/timetable"
  
  func getWakeUpMessage() -> String{
      return "NoLesson".localized + ". \n" + "GoSleep".localized(with: [self.tomorrowTime!, self.tomorrowCampus ?? "-"])
  }
  
  func getLessonsEndedMessage() -> String{
    return "LessonsEnded".localized + ". \n" + "GoSleep".localized(with: [self.tomorrowTime!, self.tomorrowCampus ?? "-"])
  }
  
  func getSchedule(completion: @escaping (Array<Subject>?) -> Void){
    if let group = UserDefaults(suiteName: "group.com.dooptha.nuwee")?.string(forKey: "group"){

      let startDate = self.getStringFromDate(date: self.getCurrentTime())
      let endDate = self.getStringFromDate(date: self.addWeek(date: self.getCurrentTime())!)
      
      let parameters: Parameters = ["group": group, "startDate": startDate, "endDate": endDate]
      Alamofire.request(url, method: .get, parameters: parameters).response{ response in
        if(response.response == nil){
          
          completion(self.loadScheduleFromDefaults())
        }else{
          let json = JSON(response.data!)
          
          let schedule = json["schedule"]
          let data = self.serializeData(schedule: schedule)
          self.saveScheduleInDefaults(schedule: schedule)
          
          completion(data)
        }
      }
    } else {
      completion(nil)
    }
  }
  
  func getAction() -> Action{
    
    if(self.subjects == nil){
      return .noServer
    }else{
      let data = self.filterSubjects()
      
      if(data.count == 0){
        self.data = data
        if(self.mode != .expanded){
          if(self.tomorrowTime != nil && self.tomorrowTime != ""){
            if(thereWasLessonsToday){
              return .lessonsEnded;
            }else{
              return .wakeUpMessage;
            }
          }
        }
        return .noLesson;
      }else{
        if(data != self.data){
          self.data = data
          return .updateTable;
        }
      }
    }
    
    return .noUpdate
  }
  
  func updateTable(action: Action){
    
    switch(action){
    case .noServer:
      self.showMessage(message: "NoServer".localized)
      self.data = Array();
      break
    case .noLesson:
      self.showMessage(message: "NoLesson".localized)
      break
    case .loading:
      self.showMessage(message: "Loading".localized)
      break
    case .lessonsEnded:
      self.showMessage(message: self.getLessonsEndedMessage().localized)
      break
    case .wakeUpMessage:
      self.showMessage(message: self.getWakeUpMessage().localized)
      break
    default: break
    }
    
    print("=====")
    print(self.currentAction)
    print(action)
    
    if(action != .noUpdate && (self.currentAction != action || action == .updateTable)){
      self.tableView.reloadData()
      
      if(action == .updateTable){
        self.tableView.backgroundView = nil;
      }
    }
    
    self.currentAction = action;
  }
  
  /*****
    Animations
  *****/
  
  func animateTable(){
    self.tableView.alpha = 0
    UIView.animate(withDuration: 0.4, animations: {
      self.tableView.alpha = 1
    })
  }
  
  /*****
    Callbacks
  *****/
  
  // every time widget appears(but not when you just swipe from lockscreen to widgets)
  
  func widgetPerformUpdate(completionHandler: (@escaping (NCUpdateResult) -> Void)) {
    
    self.tableView.contentInset = UIEdgeInsets(top: 5,left: 0,bottom: 0,right: 0)
    
    self.getSchedule(){ (data) in
      
      self.subjects = data
      let action = self.getAction()
      self.updateTable(action: action)
    }
    
    completionHandler(NCUpdateResult.newData)
  }
  
  // when widget loaded
  
  @objc func checkAction(sender : UITapGestureRecognizer) {
    
    let url: NSURL = NSURL.init(string: "NuwmApp://")!
    self.extensionContext?.open(url as URL, completionHandler: nil)
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    if #available(iOSApplicationExtension 10.0, *) {
      extensionContext?.widgetLargestAvailableDisplayMode = .expanded
    }
    
    let gesture = UITapGestureRecognizer(target: self, action:  #selector(self.checkAction))
    self.tableView.addGestureRecognizer(gesture)
    
    self.subjects = self.loadScheduleFromDefaults()
    if(self.subjects == nil){
      self.updateTable(action: .loading)
    }else{
      let action = self.getAction()
      self.updateTable(action: action)
    }
  }
  
  // when widget switched its display mdde
  
  @available(iOSApplicationExtension 10.0, *)
  func widgetActiveDisplayModeDidChange(_ activeDisplayMode: NCWidgetDisplayMode, withMaximumSize maxSize: CGSize) {
    
    let mode: NCWidgetDisplayMode = activeDisplayMode
    
    if self.mode != mode {
      
      self.mode = mode
      let action = self.getAction()
      self.updateTable(action: action)
      
      if mode == .expanded {
        preferredContentSize = CGSize(width: maxSize.width, height: CGFloat(self.data.count * 50))
      }
      else if activeDisplayMode == .compact {
        preferredContentSize = maxSize
      }
      self.animateTable()
    }
  }
  
  // every time widget appears(even when you just swipe from lockscreen to widgets)
  
  override func viewDidAppear(_ animated: Bool){
    super.viewDidAppear(animated)
    
    if #available(iOSApplicationExtension 10.0, *) {
      extensionContext?.widgetLargestAvailableDisplayMode = .expanded
    }
    self.preferredContentSize.height = CGFloat(self.data.count * 50)
    
  }
  
  /*****
    Message
  *****/
  
  func showMessage(message: String){
    let noDataLabel: PaddingLabel  = PaddingLabel(frame: CGRect(x: 0, y: 0, width: self.tableView.bounds.size.width, height: self.tableView.bounds.size.height))
    
    noDataLabel.lineBreakMode = .byWordWrapping // notice the 'b' instead of 'B'
    noDataLabel.numberOfLines = 0
    noDataLabel.text = message
    noDataLabel.textColor = UIColor.darkGray
    noDataLabel.textAlignment = .center
    
    self.tableView.backgroundView  = noDataLabel
    self.tableView.separatorStyle  = .none
    
    self.tableView.reloadData()
  }
  
  /*****
    Serialization
  *****/
  
  func serializeData(schedule: JSON) -> Array<Subject>{
    
    var newSubjects: Array<Subject> = Array()
    
    for (index,day):(String, JSON) in schedule {
      let subjects = day["subjects"]
      
      if let date = day["date"].string{
        for (index2,subject):(String, JSON) in subjects {
          if let time = subject["time"].string{
            if let subjectTime = self.getSubjectTimeStamp(time: time, date: date){
              
              let classroom: String = subject["classroom"].string ?? "-"
            
              newSubjects.append(Subject(
                time: time,
                name: subject["name"].string ?? "-",
                classroom: classroom.isEmpty ? "-" : classroom,
                date: subjectTime
              ))
            }
          }
        }
      }
    }
    
    return newSubjects
  }
  
  func getCampus(string: String) -> String{
    
    let arrayOfLetters = Array(string)
    if(arrayOfLetters.count > 0){
      return String(arrayOfLetters[0])
    }
    
    return "-"
  }
  
  func filterSubjects() -> Array<Subject>{
    
    var newData: Array<Subject> = Array()
    
    self.tomorrowTime = nil
    self.tomorrowCampus = nil
    self.thereWasLessonsToday = false
    
    let currentTime = self.getCurrentTime()
    let tomorrow = self.addOneDay(date: currentTime)
    
    for subject in self.subjects!{
      if(compareDate(date1: subject.date, date2: currentTime)){
        self.thereWasLessonsToday = true
        if((self.mode == .expanded || subject.date > currentTime) && newData.count < 7){
          newData.append(subject)
        }
      }
      
      if(self.mode != .expanded && tomorrowTime == nil){
        if(compareDate(date1: subject.date, date2: tomorrow!)){
          self.tomorrowCampus = self.getCampus(string: subject.classroom)
          self.tomorrowTime = subject.time.components(separatedBy: "-")[0]
        }
      }
    }
    
    return newData
  }
  
  /*****
    Time
  *****/
  
  func addOneDay(date: Date) -> Date?{
    return Calendar.current.date(byAdding: .day, value: 1, to: date)
  }
  
  func addWeek(date: Date) -> Date?{
    return Calendar.current.date(byAdding: .day, value: 7, to: date)
  }
  
  func getStringFromDate(date: Date) -> String{
    
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "dd.MM.yyyy"
    
    return dateFormatter.string(from: date)
  }
  
  // used for tests to replace current date with other values
  
  func getCurrentTime() -> Date{
    
    return Date()
  }
  
  func getSubjectTimeStamp(time: String, date: String) -> Date?{
    var timeParts = time.components(separatedBy: "-")
    
    if(timeParts.count > 1){
      let timeString = date + " " + timeParts[1]
      
      let dateFormatter = DateFormatter()
      dateFormatter.dateFormat = "dd.MM.yyyy HH:mm"
      dateFormatter.locale = Locale(identifier: "en_US_POSIX")
      
      let newDate: Date? = dateFormatter.date(from:timeString)
      
      return newDate
    }else{
      return nil
    }
  }
  
  func compareDate(date1:Date, date2:Date) -> Bool {
    let order = NSCalendar.current.compare(date1, to: date2, toGranularity: .day)
    switch order {
      case .orderedSame: return true
      default: return false
    }
  }
  
  /*****
    User Defaults
  *****/
  
  // erase data after 7 days pass
  
  func checkIfNotOutdated(schedule: JSON) -> Bool{
    
    let currentDate = self.getCurrentTime()
    let time = schedule[schedule.count - 1]["date"].string ?? "01.01.1901"
    if let date = self.addWeek(date: self.getSubjectTimeStamp(time: "12:00-12:00", date: time)!){
      if(currentDate > date){
        print("outdated")
        UserDefaults(suiteName: "group.com.dooptha.nuwee")?.removeObject(forKey: "schedule")
        return true
      }
    }else{
      print("outdated")
      UserDefaults(suiteName: "group.com.dooptha.nuwee")?.removeObject(forKey: "schedule")
      return true
    }
    
    return false
  }
  
  func loadScheduleFromDefaults() -> Array<Subject>?{
    if let rawJson = UserDefaults(suiteName: "group.com.dooptha.nuwee")?.string(forKey: "schedule"){
      let schedule = JSON.init(parseJSON: rawJson)
      let outdated = self.checkIfNotOutdated(schedule: schedule)
      
      if(outdated){
        return nil
      }
      return self.serializeData(schedule: schedule)
    }
    
    return nil
  }
  
  func saveScheduleInDefaults(schedule: JSON){
    UserDefaults(suiteName: "group.com.dooptha.nuwee")?.set(schedule.rawString(String.Encoding.utf8, options: JSONSerialization.WritingOptions(rawValue: 0)), forKey: "schedule")
  }
  
  /*****
    Header
  *****/
  
  /*override func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
   let vw = UIView()
   vw.backgroundColor = nil
   
   let yourLabel = UILabel(frame: CGRect(x: 12, y: 0, width: self.view.frame.size.width, height: 16))
   yourLabel.textColor = .darkGray
   yourLabel.textAlignment = .left;
   yourLabel.font = UIFont(name: yourLabel.font.fontName, size: 14)
   yourLabel.text = "Сьогодні залишилося 4 пари"
   vw.addSubview(yourLabel)
   
   return vw
   }
   
   public override func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
   return 16.0
   }*/
  
  /*****
   Table View
   *****/
  
  override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return data.count
  }
  
  override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    
    let cell = tableView.dequeueReusableCell(withIdentifier: "ScheduleItem", for: indexPath) as! ScheduleTableViewCell
    
    let item = data[indexPath.row]
    
    cell.itemTitle.text = item.name
    cell.itemDesc.text = item.time ?? "-"
    cell.itemSubtitle.text = item.classroom
    
    return cell
  }
  
  func widgetMarginInsets(forProposedMarginInsets defaultMarginInsets: UIEdgeInsets) -> (UIEdgeInsets) {
    return UIEdgeInsets.zero
  }
}
