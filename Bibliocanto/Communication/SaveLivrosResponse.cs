using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class SaveLivrosResponse : BaseResponse
    {
        public Livros Livros { get; private set; }

        private SaveLivrosResponse(bool success, string message, Livros livros) : base(success, message)
        {
            Livros = livros;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="livros">Saved category.</param>
        /// <returns>Response.</returns>
        public SaveLivrosResponse(Livros livros) : this(true, string.Empty, livros)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public SaveLivrosResponse(string message) : this(false, message, null)
        { }
    }
}
