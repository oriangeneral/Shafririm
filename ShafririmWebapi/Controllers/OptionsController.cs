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
    [RoutePrefix("api/options")]
    public class OptionsController : ApiController
    {
        private ShafririmEntities db = new ShafririmEntities();

        #region GetOptions
        // GET: api/Options
        [Route("")]
        public IQueryable<Option> GetOptions()
        {
            return db.Options;
        }
        #endregion

        #region GetOption
        [ResponseType(typeof(Option))]
        [Route("{Id}")]
        // GET: api/Options/5
        [ResponseType(typeof(Option))]
        public IHttpActionResult GetOption(int id)
        {
            Option option = db.Options.Find(id);
            if (option == null)
            {
                return NotFound();
            }

            return Ok(option);
        }
        #endregion

        #region PutOption
        [Route("{Id}")]
        [ResponseType(typeof(Option))]
        public IHttpActionResult PutOption(int id, Option option)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != option.Id)
            {
                return BadRequest();
            }

            db.Entry(option).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OptionExists(id))
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

        #region PostOption
        // POST: api/Options
        [ResponseType(typeof(Option))]
        [Route("Full")]
        public IHttpActionResult PostOption(Option option)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Options.Add(option);
            db.SaveChanges();

            return Ok(option);
        }
        #endregion

        #region PostOption
        // POST: api/Options
        [ResponseType(typeof(Option))]
        [Route("")]
        public IHttpActionResult PostOption(string desc, string mediaUrl, int dilemaId, int nextDilemaId,
            string remarks, int score)

        {

            Option option = new Option();
            option.Desc = desc;
            option.MediaUrl = mediaUrl;
            option.DilemaId = dilemaId;
            option.NextDilemaId = nextDilemaId;
            option.Remarks = remarks;
            option.Score = score;

            option.CreatedDate = DateTime.Now;
            option.UpdatedDate = DateTime.Now;


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Options.Add(option);
            db.SaveChanges();

            return Ok(option);
        }

        #endregion

        #region DeleteOption
        // DELETE: api/Options/5
        [ResponseType(typeof(Option))]
        public IHttpActionResult DeleteOption(int id)
        {
            Option option = db.Options.Find(id);
            if (option == null)
            {
                return NotFound();
            }

            db.Options.Remove(option);
            db.SaveChanges();

            return Ok(option);
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

        #region OptionExists

        private bool OptionExists(int id)
        {
            return db.Options.Count(e => e.Id == id) > 0;
        } 
        #endregion
    }
}