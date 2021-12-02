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
    internal class Agent
    {
        public Agent(string name, int currentFloor, SecurityLevel securityLevel)
        {
            Name = name;
            CurrentFloor = currentFloor;
            SecurityLevel = securityLevel;
        }

        public Elevator Elevator { get; set; }
        public string Name { get; set; }
        public int CurrentFloor { get; set; }
        public SecurityLevel SecurityLevel { get; set; }

        public void CallTheElevator()
        {
            Console.WriteLine($"{Name} call the elevator from floor {(Floor)CurrentFloor}");

            Elevator.GoToAnotherFloor((Floor)CurrentFloor);

            Console.WriteLine($"Elevator here. You can enter");

            Elevator.AddPassenger(this);
        }
        public void GoToAnotherFloor(bool wantToExitBase = false)
        {
            CallTheElevator();

            Console.WriteLine($"{Name} enter the elevator");
            Console.WriteLine("Choose your target floor");

            int nextFloor = 0;
            if (!wantToExitBase)
            {
                nextFloor = Elevator.PressButtonInside(this);
            }

            Elevator.GoToAnotherFloor((Floor)nextFloor);
            Console.WriteLine($"Arrive on {(Floor)nextFloor} floor. You can exit");
            Elevator.RemovePassenger(this);
        }

        public void LeaveBase()
        {
            GoToAnotherFloor(true);
            Console.WriteLine($"{Name} is back on the base level");
        }

    }
}
