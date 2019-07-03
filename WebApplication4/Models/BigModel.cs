using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication4.Models
{
    public class BigModel
    {
        public IQueryable<Act> Act { get; set; }
        public IQueryable<Sphere> Sphere { get; set; }
        public int SphereID { get; set; }
        public int ImpMin { get; set; }
        public int ImpMax { get; set; }
        public DateTime DateMin { get; set; }
        public DateTime DateMax { get; set; }
    }
}