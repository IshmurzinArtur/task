using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication4.Controllers
{
    public class GoalController : Controller
    {
        Models.MainDbEntities MainDb = new Models.MainDbEntities();
        public ActionResult Index()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Redirect("~/Account/Login");
            }
            string currentUserId = User.Identity.GetUserId();
            Models.GoalModel goalModel = new Models.GoalModel();
            goalModel.Goals = (from goal in MainDb.Goals where goal.UserId == currentUserId select goal);
            goalModel.GoalActs = (from sp in MainDb.GoalAct1 select sp);
            goalModel.Acts = (from act in MainDb.Acts where act.UserId == currentUserId select act);
            goalModel.Sphere = (from sp in MainDb.Spheres where sp.UserId == currentUserId select sp);
            List<Models.GoalModel> a = new List<Models.GoalModel>();
            a.Add(goalModel);
            return View(a);
        }
        public ActionResult AddGoal(string name, int[] acts, int id, string col)
        {
            Models.Goal goal = new Models.Goal();
            Models.GoalAct1 goalAct = new Models.GoalAct1();
            List<Models.GoalAct1> asd = new List<Models.GoalAct1>();
            goal.Name = name;
            goal.UserId = User.Identity.GetUserId();
            goal.Volume = 0;
            goal.Id = id;
            goal.Color = col;
            foreach (var temp in acts)
            {
                goalAct = new Models.GoalAct1();
                goalAct.Id = MainDb.GoalAct1.Count() + 1;
                goalAct.ActId = temp;
                goalAct.GoalId = id;
                goalAct.Done = 0;
                goal.Volume += (from act in MainDb.Acts where act.Id == temp select act.Importance).FirstOrDefault();
                goalAct.Name = (from act in MainDb.Acts where act.Id == temp select act.Name).FirstOrDefault();
                var Color = (from act in MainDb.Acts where act.Id == temp select act.SphereId).FirstOrDefault();
                goalAct.Color = (from sp in MainDb.Spheres where sp.Id == Color select sp.Color).FirstOrDefault();
                goalAct.Imp = (from act in MainDb.Acts where act.Id == temp select act.Importance).FirstOrDefault();
                MainDb.GoalAct1.Add(goalAct);
                MainDb.SaveChanges();
            }
            MainDb.Goals.Add(goal);
            MainDb.SaveChanges();
            return RedirectToAction("Goal");
        }
        public ActionResult delGoal(int id)
        {
            MainDb.Goals.Remove((from temp in MainDb.Goals where temp.Id == id select temp).FirstOrDefault());
            MainDb.GoalAct1.RemoveRange((from temp in MainDb.GoalAct1 where temp.GoalId == id select temp));
            MainDb.SaveChanges();
            return Redirect("~/Home/Goal");
        }
    }
}