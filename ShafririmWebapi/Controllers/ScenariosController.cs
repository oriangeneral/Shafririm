using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ShafririmWebapi;
using ShafririmWebapi.Models;

namespace ShafririmWebapi.Controllers
{
    [RoutePrefix("api/scenarios")]
    public class ScenariosController : ApiController
    {
        private ShafririmEntities db = new ShafririmEntities();

        #region GetScenarios
        // GET: api/Scenarios
        [Route("")]
        public IQueryable<Scenario> GetScenarios()
        {
            return db.Scenarios;
        }
        #endregion

        #region GetScenario
        // GET: api/Scenarios/5
        [ResponseType(typeof(Scenario))]
        [Route("{Id}")]
        public IHttpActionResult GetScenario(int id)
        {
            Scenario scenario = db.Scenarios.Find(id);
            
            if (scenario == null)
            {
                return NotFound();
            }

            return Ok(scenario);
        }
        #endregion

        #region PutScenario
        // PUT: api/Scenarios/5
        [ResponseType(typeof(Scenario))]
        [Route("{Id}")]
        public IHttpActionResult PutScenario(int id, Scenario scenario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != scenario.Id)
            {
                return BadRequest();
            }

            db.Entry(scenario).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScenarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
        #endregion

        #region PostScenario
        // POST: api/Scenarios
        [ResponseType(typeof(Scenario))]
        [Route("Full")]
        [HttpPost]
        public IHttpActionResult PostScenario(Scenario scenario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Scenarios.Add(scenario);
            db.SaveChanges();

            return Ok(scenario);
        }
        #endregion

        #region PostScenario
        // POST: api/Scenarios
        [ResponseType(typeof(Scenario))]
        [Route("")]
        [HttpPost]
        public IHttpActionResult PostScenario(string title, string desc, int categoryId,
            Nullable<int> level, string status, Nullable<int> firstDilemaId)
        {
            Scenario scenario = new Scenario();
            scenario.Title = title;
            scenario.Desc = desc;
            scenario.CategoryId = categoryId;
            scenario.Level = level;
            scenario.Status = status;
            scenario.FirstDilemaId = firstDilemaId;
            scenario.CreatedDate = DateTime.Now;
            scenario.UpdatedDate = DateTime.Now;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Scenarios.Add(scenario);
            db.SaveChanges();

            return Ok(scenario);
        }
        #endregion

        #region DeleteScenario
        // DELETE: api/Scenarios/5
        [ResponseType(typeof(Scenario))]
        public IHttpActionResult DeleteScenario(int id)
        {
            Scenario scenario = db.Scenarios.Find(id);
            if (scenario == null)
            {
                return NotFound();
            }

            db.Scenarios.Remove(scenario);
            db.SaveChanges();

            return Ok(scenario);
        }
        #endregion

        #region Dispose
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        #endregion

        #region ScenarioExists

        private bool ScenarioExists(int id)
        {
            return db.Scenarios.Count(e => e.Id == id) > 0;
        } 
        #endregion
    }
}