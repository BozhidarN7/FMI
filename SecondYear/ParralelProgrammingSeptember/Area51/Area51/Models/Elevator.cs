using Area51.Common;
using Area51.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Area51.Models
{
    internal class Elevator
    {
        private Semaphore semaphore;
        public Elevator()
        {
            semaphore = new Semaphore(1, 1);
            AgentsInside = new List<Agent>();
        }
        public Floor CurrentFloor { get; set; }

        public List<Agent> AgentsInside { get; set; }

        public int PressButtonInside(Agent agent)
        {
            Random random = new Random();
            int nextFloor = random.Next(0, 4);

            while (!CheckPermissions(agent, nextFloor))
            {
                Console.WriteLine($"{agent.Name} choose {(Floor)nextFloor} floor");
                Console.WriteLine("Sorry you do not have the permissions to go to that floor!");
                Console.WriteLine("Choose another floor");

                nextFloor = random.Next(0, 4);
            }
            Console.WriteLine($"{agent.Name} choose {(Floor)nextFloor} floor");

            return nextFloor;
        }

        public void GoToAnotherFloor(Floor targetFloor)
        {
            if (targetFloor == CurrentFloor)
            {
                return;
            }

            Console.WriteLine($"Elevator is going from floor {CurrentFloor} to {targetFloor}");
            int elevatorFloorsToTravel = Math.Abs((int)CurrentFloor - (int)targetFloor);
            Thread.Sleep(elevatorFloorsToTravel * GlobalConstants.ElevatorTravelTimePerFloor * 1000);
        }

        public void AddPassenger(Agent agent)
        {
            semaphore.WaitOne();
            lock (AgentsInside)
            {
                AgentsInside.Add(agent);
            }
        }

        public void RemovePassenger(Agent agent)
        {
            lock (AgentsInside)
            {
                AgentsInside.Remove(agent);
            }
            semaphore.Release();
        }

        private bool CheckPermissions(Agent agent, int floor)
        {
            if (agent.SecurityLevel.ToString() == "Confidential")
            {
                if (floor != 0)
                {
                    return false;
                }
            }
            if (agent.SecurityLevel.ToString() == "Secret")
            {
                if (floor == 2 || floor == 3)
                {
                    return false;
                }
            }

            return true;
        }
    }
}
