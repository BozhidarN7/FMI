using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace PriceScraper
{
    public class Program
    {
        static async Task Main(string[] args)
        {
            StreamReader streamReader = new StreamReader("../../../urls.txt");
            List<string> urls = new List<string>();
            using (streamReader)
            {
                string url = streamReader.ReadLine();

                while (url != null)
                {
                    urls.Add(url);

                    url = streamReader.ReadLine();
                }
            }

            StringBuilder sb = new StringBuilder();

            // fan out
            List<Task<string>> taskList = new List<Task<string>>();
            foreach (string url in urls)
            {
                taskList.Add(Task.Run(() =>
                {
                    string html = CallUrl(url).Result;

                    string priceString = GetPriceString(html);
                    // looks something like this: ">689<sup>99</sup> <span>лв.<
                    //Console.WriteLine(priceString);

                    string price = GetPrice(priceString);
                    return price;
                }));
            }

            // fan in
            int index = 0;
            Task<string[]> fanInTask = Task.WhenAll(taskList);
            Task<StringBuilder> final = fanInTask.ContinueWith(prev => sb.AppendLine(string.Join(Environment.NewLine, prev.Result)));
            final.Wait();

            string result = sb.ToString();
            Console.WriteLine(result);
        }
        public static async Task<string> CallUrl(string fullUrl)
        {
            // https://www.scrapingbee.com/blog/web-scraping-csharp/ - from here I learn how to retrieve html

            HttpClient client = new HttpClient();
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls13;
            client.DefaultRequestHeaders.Accept.Clear();
            Task<string> response = client.GetStringAsync(fullUrl);
            return await response;
        }

        public static string GetPrice(string priceString)
        {
            List<int> digits = new List<int>();
            for (int i = 0; i < priceString.Length; i++)
            {
                char symbol = priceString[i];

                if (symbol == '&') // &#46; this is a code for "." we should skip it
                {
                    i += 4;
                }

                if (symbol >= '0' && symbol <= '9')
                {
                    digits.Add(symbol - '0');
                }
            }

            // The last two digits will always be the digits after the decimal part
            string price = "";
            for (int i = 0; i < digits.Count - 2; i++)
            {
                price += digits[i];
            }
            price += $".{digits[digits.Count - 1]}{digits[digits.Count - 2]}лв.";
            return price;
        }

        public static string GetPriceString(string html)
        {
            string priceClass = "product-new-price";
            int priceClassIndex = html.IndexOf(priceClass);
            int closingPriceSupTagIndex = html.IndexOf("</sup>", priceClassIndex);
            return html.Substring(priceClassIndex + priceClass.Length, closingPriceSupTagIndex - priceClassIndex);
        }
    }
}
