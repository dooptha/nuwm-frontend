//
//  ScheduleTableViewCell.swift
//  ScheduleWidget
//
//  Created by Roman Sereda on 8/3/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit

class ScheduleTableViewCell: UITableViewCell {
  
  @IBOutlet weak var itemSubtitle: UILabel!
  @IBOutlet weak var itemTitle: UILabel!
  @IBOutlet weak var itemDesc: UILabel!
  override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
