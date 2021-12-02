using Area51.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Area51.Models
{
    internal class Base
    {
        public Base(Elevator elevator)
        {
            Elevator = elevator;
            Agents = new List<Agent>();
        }

        public List<Agent> Agents { get; set; }
        public Elevator Elevator { get; set; }

        public void EnterBase(Agent agent)
        {
            // default floor for all agents when entering the base is G floor
            Console.WriteLine($"{agent.Name} enter the base");

            // agent go to some level to do some work
            agent.GoToAnotherFloor();


            Console.WriteLine($"{agent.Name} is doing work on {(Floor)agent.CurrentFloor} floor");
            Thread.Sleep(500);

            // work is finished. Is's time to leave the base
            agent.LeaveBase();

            Console.WriteLine($"{agent.Name} leave the base");

        }
        public int AddAgent(Agent agent)
        {
            Agents.Add(agent);

            return Agents.Count;
        }
    }
}
