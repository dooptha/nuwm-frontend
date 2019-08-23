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
  var title: String
  var desc: String
  var subtitle: String
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
  var mode: NCWidgetDisplayMode?
  var tomorrowCampus: String?
  var tomorrowTime: String?
  let url: String = "https://api.dooptha.com/timetable/test"
        
  override func viewDidLoad() {
    super.viewDidLoad()
    self.tableView.backgroundView = nil;
  }
  
  func getWakeUpMessage() -> String?{
    if(self.tomorrowTime != nil && self.tomorrowCampus != nil && self.tomorrowCampus != "-" && self.tomorrowTime != ""){
      return "GoSleep".localized(with: [self.tomorrowTime!, self.tomorrowCampus!])
    }
    return nil
  }
  
  func widgetPerformUpdate(completionHandler: (@escaping (NCUpdateResult) -> Void)) {
    
    self.tableView.contentInset = UIEdgeInsets(top: 5,left: 0,bottom: 0,right: 0)
    
    self.getSchedule(){ (data) in
      
      if(data == nil){
        self.showMessage(message: "NoServer".localized)
      }else{
        if(data != self.data){
          self.data = data!
          self.tableView.reloadData()
          self.tableView.backgroundView = nil;
        }
        if(data!.count == 0){
          if(self.mode == .compact){
            if let message = self.getWakeUpMessage(){
              self.showMessage(message: message)
            }else{
              self.showMessage(message: "NoLesson".localized)
            }
            self.tableView.reloadData()
          }
        }
      }
    }
    
    completionHandler(NCUpdateResult.newData)
  }
  
  func getSchedule(completion: @escaping (Array<Subject>?) -> Void){
    if let group = UserDefaults(suiteName: "group.nuwmapp.com")?.string(forKey: "group"){
      Alamofire.request(url, method: .get).response{ response in
        if(response.response == nil){
          
          completion(self.loadScheduleFromDefaults())
        }else{
          let json = JSON(response.data!)
          
          let schedule = json["schedule"]
          let data = self.serializeResponse(schedule: schedule)
          self.saveScheduleInDefaults(schedule: schedule)
          
          completion(data)
        }
      }
    } else {
      completion(nil)
    }
  }
  
  /*****
    Message
  *****/
  
  func showMessage(message: String){
    let noDataLabel: UILabel  = UILabel(frame: CGRect(x: 0, y: 0, width: self.tableView.bounds.size.width, height: self.tableView.bounds.size.height))
    
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
  
  func serializeResponse(schedule: JSON) -> Array<Subject>{
    var newData: Array<Subject> = Array()
    
    let currentTime = self.getCurrentTime()
    let tomorrow = self.addOneDay(date: currentTime)
    
    for (index,day):(String, JSON) in schedule {
      let subjects = day["subjects"]
      
      if let date = day["date"].string{
        for (index2,subject):(String, JSON) in subjects {
          if let time = subject["time"].string{
            
            if let subjectTime = self.getSubjectTimeStamp(time: time, date: date){
              if(compareDate(date1: subjectTime, date2: currentTime)){
                
                if(self.mode == .expanded || subjectTime > currentTime){
                  newData.append(Subject(title: subject["time"].string ?? "-", desc: subject["name"].string ?? "-", subtitle: subject["classroom"].string ?? "-"))
                }
              }
            }
          }
        }
        
        if(self.mode == .compact){
          if let dayDate = self.getSubjectTimeStamp(time: "12:00-13:20", date: date){
            if(compareDate(date1: dayDate, date2: tomorrow!)){
              if let classroom = subjects[0]["classroom"].string{
                self.tomorrowCampus = String(Array(classroom)[0])
              }
              
              if let time = subjects[0]["time"].string{
                self.tomorrowTime = time.components(separatedBy: "-")[0]
              }
            }
          }
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
  
  func getCurrentTime() -> Date{
    
    let calendar = Calendar.current
    var components = DateComponents()
    
    components.day = 5
    components.month = 9
    components.year = 2018
    components.hour = 12
    components.minute = 0
    
    return calendar.date(from: components)!
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
  
  func checkIfNotOutdated(schedule: JSON) -> Bool{
    
    let currentDate = self.getCurrentTime()
    let time = schedule[schedule.count - 1]["date"].string
    if let date = self.getSubjectTimeStamp(time: "12:00-12:00", date: time!){
      if(currentDate > date){
        print("outdated")
        UserDefaults(suiteName: "group.nuwmapp.com")?.removeObject(forKey: "schedule")
        return true
      }
    }else{
      print("outdated")
      UserDefaults(suiteName: "group.nuwmapp.com")?.removeObject(forKey: "schedule")
      return true
    }
    
    return false
  }
  
  func loadScheduleFromDefaults() -> Array<Subject>?{
    if let rawJson = UserDefaults(suiteName: "group.nuwmapp.com")?.string(forKey: "schedule"){
      let schedule = JSON.init(parseJSON: rawJson)
      let outdated = self.checkIfNotOutdated(schedule: schedule)
      
      if(outdated){
        return nil
      }
      return self.serializeResponse(schedule: schedule)
    }
    
    return nil
  }
  
  func saveScheduleInDefaults(schedule: JSON){
    UserDefaults(suiteName: "group.nuwmapp.com")?.set(schedule.rawString(String.Encoding.utf8, options: JSONSerialization.WritingOptions(rawValue: 0)), forKey: "schedule")
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
    
    cell.itemTitle.text = item.title
    cell.itemDesc.text = item.desc
    cell.itemSubtitle.text = item.subtitle
    
    return cell
  }
  
  override func viewDidAppear(_ animated: Bool){
    super.viewDidAppear(animated)
    
    if #available(iOSApplicationExtension 10.0, *) {
      extensionContext?.widgetLargestAvailableDisplayMode = .expanded
    }
    self.preferredContentSize.height = 100
  }
  
  func widgetMarginInsets(forProposedMarginInsets defaultMarginInsets: UIEdgeInsets) -> (UIEdgeInsets) {
    return UIEdgeInsets.zero
  }
  
  @available(iOSApplicationExtension 10.0, *)
  
  func widgetActiveDisplayModeDidChange(_ activeDisplayMode: NCWidgetDisplayMode, withMaximumSize maxSize: CGSize) {
    
    let mode: NCWidgetDisplayMode = activeDisplayMode
    
    if(activeDisplayMode == .expanded){
      print("expanded")
    }else{
      print("compact")
    }
    
    if self.mode != mode {
      if mode == .expanded {
        self.widgetPerformUpdate(){ (res) in }
        preferredContentSize = CGSize(width: maxSize.width, height: 300)
      }
      else if activeDisplayMode == .compact {
        self.widgetPerformUpdate(){ (res) in }
        preferredContentSize = maxSize
      }
      
      self.mode = mode
    }
  }
    
}
