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
    [RoutePrefix("api/dilemas")]
    public class DilemasController : ApiController
    {
        private ShafririmEntities db = new ShafririmEntities();

        #region GetDilemas
        // GET: api/Dilemas
        [Route("")]
        public IQueryable<Dilema> GetDilemas()
        {
            return db.Dilemas;
        }
        #endregion

        #region GetDilemas
        [Route("{dilemaId}/options")]
        public IQueryable<Option> GetDilemas(int dilemaId)
        {

            return db.Options.Where(o => o.DilemaId == dilemaId);
        }
        #endregion

        #region GetDilema
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

        #endregion

        #region PutDilema
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

        #endregion

        #region PostDilema
        // POST: api/Dilemas
        [ResponseType(typeof(Dilema))]
        [Route("Full")]
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

        #endregion

        #region DeleteDilema
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

        #region DilemaExists

        private bool DilemaExists(int id)
        {
            return db.Dilemas.Count(e => e.Id == id) > 0;
        } 
        #endregion
    }
}