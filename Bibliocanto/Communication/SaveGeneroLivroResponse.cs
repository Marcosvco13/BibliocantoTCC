using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class GeneroLivroResponse : BaseResponse
    {
        public GeneroLivro GeneroLivro { get; private set; }

        private GeneroLivroResponse(bool success, string message, GeneroLivro generoLivro) : base(success, message)
        {
            GeneroLivro = generoLivro;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="generoslivros">Saved generos.</param>
        /// <returns>Response.</returns>
        public GeneroLivroResponse(GeneroLivro generoLivro) : this(true, string.Empty, generoLivro)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public GeneroLivroResponse(string message) : this(false, message, null)
        { }
    }
}