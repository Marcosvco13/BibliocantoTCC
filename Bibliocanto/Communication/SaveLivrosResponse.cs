using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class LivrosResponse : BaseResponse
    {
        public Livros Livros { get; private set; }

        private LivrosResponse(bool success, string message, Livros livros) : base(success, message)
        {
            Livros = livros;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="livros">Saved category.</param>
        /// <returns>Response.</returns>
        public LivrosResponse(Livros livros) : this(true, string.Empty, livros)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public LivrosResponse(string message) : this(false, message, null)
        { }
    }
}
