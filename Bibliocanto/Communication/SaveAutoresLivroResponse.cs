using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class AutoresLivroResponse : BaseResponse
    {
        public AutoresLivros AutorLivro { get; private set; }

        private AutoresLivroResponse(bool success, string message, AutoresLivros autorLivro) : base(success, message)
        {
            AutorLivro = autorLivro;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="autoresLivros">Saved generos.</param>
        /// <returns>Response.</returns>
        public AutoresLivroResponse(AutoresLivros autorLivro) : this(true, string.Empty, autorLivro)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public AutoresLivroResponse(string message) : this(false, message, null)
        { }
    }
}