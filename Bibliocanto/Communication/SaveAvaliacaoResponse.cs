using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class AvaliacaoResponse : BaseResponse
    {
        public Avaliacao Avaliacao { get; private set; }

        private AvaliacaoResponse(bool success, string message, Avaliacao avaliacao) : base(success, message)
        {
            Avaliacao = avaliacao;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved category.</param>
        /// <returns>Response.</returns>
        public AvaliacaoResponse(Avaliacao avaliacao) : this(true, string.Empty, avaliacao)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public AvaliacaoResponse(string message) : this(false, message, null)
        { }
    }
}
