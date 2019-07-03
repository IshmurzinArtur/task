using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication4.Models
{
    public class GoalModel
    {
        public IQueryable<Goal> Goals { get; set; }
        public IQueryable<GoalAct1> GoalActs { get; set; }

        public IQueryable<Act> Acts { get; set; }

        public IQueryable<Sphere> Sphere { get; set; }
    }
}