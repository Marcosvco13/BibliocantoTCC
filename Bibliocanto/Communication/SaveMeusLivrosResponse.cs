using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class MeusLivrosResponse : BaseResponse
    {
        public MeusLivros MeuLivro { get; private set; }

        private MeusLivrosResponse(bool success, string message, MeusLivros meuLivro) : base(success, message)
        {
            MeuLivro = meuLivro;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved category.</param>
        /// <returns>Response.</returns>
        public MeusLivrosResponse(MeusLivros meuLivro) : this(true, string.Empty, meuLivro)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public MeusLivrosResponse(string message) : this(false, message, null)
        { }
    }
}

