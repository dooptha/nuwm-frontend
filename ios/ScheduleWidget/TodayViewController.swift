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

struct Subject {
  var title: String
  var desc: String
  var subtitle: String
}

extension String {
  var localized: String {
    return NSLocalizedString(self, tableName: nil, bundle: Bundle.main, value: "", comment: "")
  }
}

class TodayViewController: UITableViewController, NCWidgetProviding {
  
  var data: Array<Subject> = Array()
        
  override func viewDidLoad() {
    super.viewDidLoad()
  }
  
  func widgetPerformUpdate(completionHandler: (@escaping (NCUpdateResult) -> Void)) {
    
    let url = "http://calc.nuwm.edu.ua:3002/api/sched?group=%D0%9F%D0%9C-41&sdate=03.09.2018&edate=03.09.2018&type=days";
    
    
    Alamofire.request(url, method: .get).response{ response in
      
      let json = JSON(response.data!)
      
      let schedule = json["response"]["schedule"]
      
      self.data = Array()
      
      for (index,day):(String, JSON) in schedule {
        
        let subjects = day["subjects"]
        
        for (index,subject):(String, JSON) in subjects {
          
          self.data.append(Subject(title: subject["time"].string ?? "-", desc: subject["subject"].string ?? "-", subtitle: subject["classroom"].string ?? "-"))
        }
      }
      
      if(self.data.count > 0){
        self.tableView.reloadData()
      }else{
        let noDataLabel: UILabel  = UILabel(frame: CGRect(x: 0, y: 0, width: self.tableView.bounds.size.width, height: self.tableView.bounds.size.height))
        noDataLabel.text = "NoLesson".localized
        noDataLabel.textColor = UIColor.darkGray
        noDataLabel.textAlignment = .center
        
        self.tableView.backgroundView  = noDataLabel
        self.tableView.separatorStyle  = .none
        
        self.tableView.reloadData()
      }
      
      completionHandler(NCUpdateResult.newData)
    }
  }
  
  override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return data.count
  }
  
  override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    
    let cell = tableView.dequeueReusableCell(withIdentifier: "ScheduleItem", for: indexPath) as! ScheduleTableViewCell
    
    self.tableView.backgroundView = nil;
    
    let item = data[indexPath.row]
    
    cell.itemTitle.text = item.title as? String
    cell.itemDesc.text = item.desc as? String
    cell.itemSubtitle.text = item.subtitle as? String
    
    return cell
  }
  
  override func viewDidAppear(_ animated: Bool){
    super.viewDidAppear(animated)
    
    if #available(iOSApplicationExtension 10.0, *) {
      extensionContext?.widgetLargestAvailableDisplayMode = .expanded
    }
    self.preferredContentSize.height = 200
  }
  
  func widgetMarginInsets(forProposedMarginInsets defaultMarginInsets: UIEdgeInsets) -> (UIEdgeInsets) {
    return UIEdgeInsets.zero
  }
  
  @available(iOSApplicationExtension 10.0, *)
  
  func widgetActiveDisplayModeDidChange(_ activeDisplayMode: NCWidgetDisplayMode, withMaximumSize maxSize: CGSize) {
    
    if activeDisplayMode == .expanded {
      preferredContentSize = CGSize(width: maxSize.width, height: 300)
    }
    else if activeDisplayMode == .compact {
      preferredContentSize = maxSize
    }
  }
    
}
