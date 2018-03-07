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

namespace ShafririmWebapi.Controllers
{
    [RoutePrefix("api/Scenarios")]
    public class ScenariosController : ApiController
    {
        private ShafririmEntities db = new ShafririmEntities();

        // GET: api/Scenarios
        [Route("")]
        public IQueryable<Scenario> GetScenarios()
        {
            return db.Scenarios;
        }

        // GET: api/Scenarios/5
        [ResponseType(typeof(Scenario))]
        [Route("{Id}")]
        public IHttpActionResult GetScenario(int id)
        {
            Scenario scenario = db.Scenarios.Find(id);

            var a = CommonHandler.ObjectToJson(scenario);

            if (scenario == null)
            {
                return NotFound();
            }

            return Ok(scenario);
        }

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

        // POST: api/Scenarios
        [ResponseType(typeof(Scenario))]
        [Route("")]
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

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ScenarioExists(int id)
        {
            return db.Scenarios.Count(e => e.Id == id) > 0;
        }
    }
}