using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;

namespace posmn_coin_info.Test
{
  [TestClass]
  public class CurrenciesRetrieverTest
  {
    [TestMethod]
    public async Task Get()
    {
      var currenciesRetriever = new CurrenciesRetriever();
      var currenciesResponse = await currenciesRetriever.Get();
      Assert.IsNotNull(currenciesResponse);
      var currenciesResponse2 = await currenciesRetriever.Get();
      Assert.IsNotNull(currenciesResponse2);
    }
  }
}
