using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace monkey_importer.Models
{
  public class Masternode
  {
    public int Active { get; set; }

    public int Collateral { get; set; }

    public long Locked { get; set; }

    [JsonProperty("locked_percentage")]
    public double LockedPercentage { get; set; }

    [JsonProperty("roi_year")]
    public double RoiYear { get; set; }

    public Coins Coins { get; set; }
    
  }
}
