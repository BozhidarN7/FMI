using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;

namespace WordAnalyzer
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string book = File.ReadAllText("../../../book.txt");
            string[] words = SplitIntoWords(book);

            Stopwatch watch = new Stopwatch();
            watch.Start();

            WithoudThreads(words);
            //WithThreads(words);

            watch.Stop();   

            Console.WriteLine("Elapsed time: {0}", watch.ElapsedMilliseconds);
        }

        static void WithoudThreads(string[] words)
        {
            CountNumberOfWords(words);
            FindShortedWord(words);
            FindTheLongestWord(words);
            FindAverageWordLength(words);
            FindFiveMostCommonWords(words);
            Console.WriteLine();
            FindFiveLeastCommonWords(words);
            Console.WriteLine();
        }

        static void WithThreads(string [] words)
        {
            Thread thread1 = new Thread(() => CountNumberOfWords(words));
            Thread thread2 = new Thread(() => FindShortedWord(words));
            Thread thread3 = new Thread(() => FindTheLongestWord(words));
            Thread thread4 = new Thread(() => FindAverageWordLength(words));
            Thread thread5 = new Thread(() => FindFiveMostCommonWords(words));
            Thread thread6 = new Thread(() => FindFiveLeastCommonWords(words));

            thread1.Start();
            thread2.Start();
            thread3.Start();
            thread4.Start();
            thread5.Start();
            thread6.Start();

            thread6.Join();
        }
        static string[] SplitIntoWords(string book)
        {
            char[] punctuation = book.Where(Char.IsPunctuation).Distinct().ToArray();
            return book.Split().Select(x => x.Trim(punctuation)).Where(x => x.Length > 0).ToArray();

        }

        static void CountNumberOfWords(string[] words)
        {
            Console.WriteLine(words.Length);
        }

        // The method returns the shorted word. If more than one word with same length exists it returns the last one
        // in order to do more operations
        static void FindShortedWord(string[] words)
        {
            int shortestLength = words.Min(x => x.Length);
            string word = words.Last(x => x.Length == shortestLength);
            Console.WriteLine(word);
        }


        // The method returns the shorted word. If more than one word with same length exists it returns the last one
        // in order to do more operations
        static void FindTheLongestWord(string[] words)
        {
            int longestLength = words.Max(x => x.Length);
            string word = words.Last(x => x.Length == longestLength);
            Console.WriteLine(word);
        }

        static void FindAverageWordLength(string[] words)
        {
            Console.WriteLine(Math.Round(words.Average(x => x.Length)));
        }

        static void FindFiveMostCommonWords(string[] words)
        {
            Dictionary<string, int> wordsCount = CountWordsOcc(words);

            string[] topFive = wordsCount.OrderByDescending(x => x.Value).Select(x => x.Key).Take(5).ToArray();
            Console.WriteLine(string.Join(Environment.NewLine, topFive));
        }

        static void FindFiveLeastCommonWords(string[] words)
        {
            Dictionary<string, int> wordsCount = CountWordsOcc(words);

            string[] topFive = wordsCount.OrderBy(x => x.Value).Select(x => x.Key).Take(5).ToArray();
            Console.WriteLine(string.Join(Environment.NewLine, topFive));
        }

        static Dictionary<string, int> CountWordsOcc(string[] words)
        {
            Dictionary<string, int> wordsCount = new Dictionary<string, int>();

            foreach (string word in words)
            {
                if (!wordsCount.ContainsKey(word))
                {
                    wordsCount[word] = 0;
                }
                wordsCount[word]++;
            }

            return wordsCount;
        }
    }
}
