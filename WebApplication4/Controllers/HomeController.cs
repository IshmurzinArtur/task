using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace WebApplication4.Controllers
{
    public class HomeController : Controller
    {
        Models.MainDbEntities MainDb = new Models.MainDbEntities();
        public ActionResult Index(int? sphere, int? impMin, int? impMax, DateTime? dateMin, DateTime? dateMax)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Redirect("~/Account/Login");
            }
            else
            {
                string currentUserId = User.Identity.GetUserId();
                Models.BigModel bigModel = new Models.BigModel();
                bigModel.Act = (from act in MainDb.Acts where act.UserId == currentUserId select act);
                if (sphere != null)
                {
                    bigModel.Act = (from act in bigModel.Act where act.SphereId == sphere select act);
                }
                if (impMin!=null)
                {
                    bigModel.Act = (from act in bigModel.Act where act.Importance > impMin select act);
                }
                if (impMax != null)
                {
                    bigModel.Act = (from act in bigModel.Act where act.Importance < impMax select act);
                }
                if (dateMin != null)
                {
                    bigModel.Act = (from act in bigModel.Act where act.Date > dateMin select act);
                }
                if (dateMax != null)
                {
                    bigModel.Act = (from act in bigModel.Act where act.Date < dateMax select act);
                }
                bigModel.Sphere = (from sp in MainDb.Spheres where sp.UserId == currentUserId select sp);
                List<Models.BigModel> a = new List<Models.BigModel>();
                a.Add(bigModel);
                return View(a);
            }
        }

        [HttpPost]
        public ActionResult AddAct(string name, string des, int sfera, int imp, int id, string[] tags, DateTime date)
        {
            Models.Act act = new Models.Act();
            act.Name = name;
            act.UserId = HttpContext.User.Identity.GetUserId();
            act.Description = des;
            act.Importance = imp;
            act.SphereId = sfera;
            act.Id = id;
            act.Date = date;
            if (tags != null)
            {
                for (var i = 0; i < tags.Length; i++)
                {
                    if (i == 0)
                        act.Tag1 = tags[i];
                    if (i == 1)
                        act.Tag2 = tags[i];
                    if (i == 2)
                        act.Tag3 = tags[i];
                }
            }
            MainDb.Acts.Add(act);
            var sp = MainDb.Spheres.Where(c => c.Id == sfera).FirstOrDefault();
            sp.CountAct += 1;
            MainDb.SaveChanges();
            return null;
        }
        [HttpPost]
        public ActionResult Save(string name, string des, int sfera, int imp, int id, DateTime date)
        {
            foreach (var r in MainDb.Acts)
            {
                if (r.Id == id)
                {
                    r.Name = name;
                    r.Description = des;
                    r.Importance = imp;
                    r.SphereId = sfera;
                    r.Date = date;
                }
            }
            MainDb.SaveChanges();
            return null;
        }

        [HttpPost]
        public ActionResult SaveSP(string name,string des,string col,int id)
        {
            Models.Sphere sphere = new Models.Sphere();
            sphere.Name = name;
            sphere.Description = des;
            sphere.Color = col.ToUpper();
            sphere.Id = id;
            sphere.UserId = HttpContext.User.Identity.GetUserId();
            sphere.CountAct = 0;
            sphere.Archiv = 0;
            MainDb.Spheres.Add(sphere);
            MainDb.SaveChanges();
            return null;
        }
        [HttpPost]
        public ActionResult Del(int id)
        {
            foreach(var temp in MainDb.GoalAct1)
            {
                if (temp.ActId == id)
                {
                    temp.Done = 1;
                }
            }
            foreach (var r in MainDb.Acts)
            {
                if (r.Id == id)
                {
                    MainDb.Acts.Remove(r);
                    var sp = MainDb.Spheres.Where(c => c.Id == r.SphereId).FirstOrDefault();
                    var goalActs = (from gA in MainDb.GoalAct1 where gA.ActId == id select gA.Done);
                    sp.Archiv += 1;
                    sp.CountAct -= 1;
                }
            }
            MainDb.SaveChanges();
            return null;
        }

        public ActionResult Sphere()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Redirect("~/Account/Login");
            }
            else
            {
                var currentUserId = User.Identity.GetUserId();
                Models.BigModel bigModel = new Models.BigModel();
                bigModel.Act = (from act in MainDb.Acts where act.UserId == currentUserId select act);
                bigModel.Sphere = (from sp in MainDb.Spheres where sp.UserId == currentUserId select sp);
                List<Models.BigModel> a = new List<Models.BigModel>();
                a.Add(bigModel);
                return View(a);
            }
        }
    }
}