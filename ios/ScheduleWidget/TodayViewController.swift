//
//  TodayViewController.swift
//  ScheduleWidget
//
//  Created by Roman Sereda on 8/3/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

struct Subject {
  var title: String
  var desc: String
}

import UIKit
import NotificationCenter

class TodayViewController: UITableViewController, NCWidgetProviding {
  
  var data: Array<Subject> = Array()
        
  override func viewDidLoad() {
    super.viewDidLoad()
    
    self.data.append(Subject(title: "title1", desc: "desc1"))
    self.data.append(Subject(title: "title2", desc: "desc2"))
  }
  
  func widgetPerformUpdate(completionHandler: (@escaping (NCUpdateResult) -> Void)) {
    
    completionHandler(NCUpdateResult.newData)
  }
  
  override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return data.count
  }
  
  override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    
    let cell = tableView.dequeueReusableCell(withIdentifier: "ScheduleItem", for: indexPath) as! ScheduleTableViewCell
    
    let item = data[indexPath.row]
    
    cell.itemTitle.text = item.title as? String
    cell.itemDesc.text = item.desc as? String
    
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
