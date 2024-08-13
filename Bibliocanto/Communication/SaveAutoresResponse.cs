using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class SaveAutoresResponse : BaseResponse
    {
        public Autores Autor { get; private set; }

        private SaveAutoresResponse(bool success, string message, Autores autor) : base(success, message)
        {
            Autor = autor;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved category.</param>
        /// <returns>Response.</returns>
        public SaveAutoresResponse(Autores autor) : this(true, string.Empty, autor)
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
