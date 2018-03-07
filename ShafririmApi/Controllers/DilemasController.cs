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
    [RoutePrefix("api/Dilemas")]
    public class DilemasController : ApiController
    {
        private ShafririmEntities db = new ShafririmEntities();

        // GET: api/Dilemas
        [Route("")]
        public IQueryable<Dilema> GetDilemas()
        {
            return db.Dilemas;
        }

        // GET: api/Dilemas/5
        [ResponseType(typeof(Dilema))]
        [Route("{Id}")]
        public IHttpActionResult GetDilema(int id)
        {
            Dilema dilema = db.Dilemas.Find(id);

            var a = CommonHandler.ObjectToJson(dilema);

            if (dilema == null)
            {
                return NotFound();
            }

            return Ok(dilema);
        }

        // PUT: api/Dilemas/5
      
        [Route("{Id}")]
        [ResponseType(typeof(Dilema))]
        public IHttpActionResult PutDilema(int id, Dilema dilema)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dilema.Id)
            {
                return BadRequest();
            }

            db.Entry(dilema).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DilemaExists(id))
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

        // POST: api/Dilemas
        [ResponseType(typeof(Dilema))]
        [Route("")]
        public IHttpActionResult PostDilema(Dilema dilema)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Dilemas.Add(dilema);
            db.SaveChanges();

            return Ok(dilema);
        }

        // DELETE: api/Dilemas/5
        [ResponseType(typeof(Dilema))]
        public IHttpActionResult DeleteDilema(int id)
        {
            Dilema dilema = db.Dilemas.Find(id);
            if (dilema == null)
            {
                return NotFound();
            }

            db.Dilemas.Remove(dilema);
            db.SaveChanges();

            return Ok(dilema);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DilemaExists(int id)
        {
            return db.Dilemas.Count(e => e.Id == id) > 0;
        }
    }
}