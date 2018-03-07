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
    [RoutePrefix("api/categories")]
    public class CategoriesController : ApiController
    {
        private ShafririmEntities db = new ShafririmEntities();

        #region GetCategories
        // GET: api/Categories

        [Route("")]
        public IQueryable<Category> GetCategories()
        {
            return db.Categories;
        }
        #endregion

        #region GetCategory
        [Route("{Id}")]
        // GET: api/Categories/5
        [ResponseType(typeof(Category))]
        public IHttpActionResult GetCategory(int id)
        {
            Category category = db.Categories.Find(id);
           
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }
        #endregion

        #region PutCategory
        // PUT: api/Categories/5
        [Route("{Id}")]
        [ResponseType(typeof(Category))]
        public IHttpActionResult PutCategory(int id, Category category)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != category.Id)
            {
                return BadRequest();
            }

            db.Entry(category).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        #region PostCategory
        // POST: api/Categories
        [Route("Full")]
        [ResponseType(typeof(Category))]
        [HttpPost]
        public IHttpActionResult PostCategory(Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Categories.Add(category);
            var a = db.SaveChanges();

            return Ok(category);
        }

        #endregion

        #region PostCategory
        [Route("")]
        [ResponseType(typeof(Category))]
        [HttpPost]
        public IHttpActionResult PostCategory(string title, string desc)
        {
            Category category = new Category();

            category.Title = title;
            category.Desc = desc;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Categories.Add(category);
            var a = db.SaveChanges();

            return Ok(category);
        }
        #endregion

        #region GetScenariosByCategory
        // GET: api/Scenarios
        [Route("{CategoryId}/scenarios")]
        public IQueryable<Scenario> GetScenariosByCategory(int categoryId)
        {
            return db.Scenarios.Where(s => s.CategoryId == categoryId);
        }
        #endregion

        #region DeleteCategory
        // DELETE: api/Categories/5
        [ResponseType(typeof(Category))]
        public IHttpActionResult DeleteCategory(int id)
        {
            Category category = db.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            db.Categories.Remove(category);
            db.SaveChanges();

            return Ok(category);
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

        #region CategoryExists

        private bool CategoryExists(int id)
        {
            return db.Categories.Count(e => e.Id == id) > 0;
        } 
        #endregion
    }
}