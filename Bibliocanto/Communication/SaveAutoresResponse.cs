using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class SaveAutoresResponse : BaseResponse
    {
        public Autores Autor { get; private set; }

        private SaveAutoresResponse(bool success, string message, Autores category) : base(success, message)
        {
            Autor = category;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved category.</param>
        /// <returns>Response.</returns>
        public SaveAutoresResponse(Autores category) : this(true, string.Empty, category)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public SaveAutoresResponse(string message) : this(false, message, null)
        { }
    }
}
