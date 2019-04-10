using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace coingecko_importer.Models
{
  public class SupportedCoinEntity : TableEntity
  {
    public SupportedCoinEntity(string id)
    {
      this.PartitionKey = "supportedcoin";
      this.RowKey = id;
    }
  }
}
