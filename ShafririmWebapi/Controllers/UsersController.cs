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
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private ShafririmEntities db = new ShafririmEntities();

        #region GetUsers
        // GET: api/Users
        [Route("")]
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }
        #endregion

        #region GetUser
        [Route("{Id}")]
        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        #endregion

        #region PutUser
        // PUT: api/Users/5
        [Route("{Id}")]
        [ResponseType(typeof(User))]

        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        #region PostUser
        // POST: api/Users
        [Route("")]
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // User name and id don't exist in db
            if (!string.IsNullOrEmpty(user.Name) && !UserExists(user.Name))
            {
                db.Users.Add(user);
                db.SaveChanges();
            }
            // User exists
            else
            {
                user = db.Users.Single(u => u.Name == user.Name);
            }
            return Ok(user);
        }
        #endregion

        #region DeleteUser
        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
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

        #region UserExists
        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }

        private bool UserExists(string name)
        {
            return db.Users.Count(e => e.Name == name) > 0;
        }
        #endregion
    }
}