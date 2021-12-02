using Area51.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading;

namespace Area51
{
    internal class StartUp
    {
        static void Main(string[] args)
        {
            Elevator elevator = new Elevator();
            Base secretBase = new Base(elevator);

            AddAgents(secretBase,elevator);

            List<Thread> agentsThreads = new List<Thread>();
            foreach (Agent agent in secretBase.Agents)
            {
                Thread thread = new Thread(() => secretBase.EnterBase(agent));
                agentsThreads.Add(thread);
                thread.Start();
            }

            foreach (Thread thread in agentsThreads)
            {
                thread.Join();
            }

            Console.WriteLine();
            Console.WriteLine("Everyone exit the base!");
        }

        public static void AddAgents(Base secretBase, Elevator elevator)
        {
            string jsonString = File.ReadAllText("../../../Datasets/agents.json");
            JsonSerializer.Deserialize<List<Agent>>(jsonString).ForEach(a => {
                secretBase.AddAgent(a);
                a.Elevator = elevator;
                });
        }
    }
}
