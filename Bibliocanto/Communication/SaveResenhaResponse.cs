using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class ResenhaResponse : BaseResponse
    {
        public Resenha Resenha { get; private set; }

        private ResenhaResponse(bool success, string message, Resenha resenha) : base(success, message)
        {
            Resenha = resenha;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved category.</param>
        /// <returns>Response.</returns>
        public ResenhaResponse(Resenha resenha) : this(true, string.Empty, resenha)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public ResenhaResponse(string message) : this(false, message, null)
        { }
    }
}
