using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class DeslikeLivrosResponse : BaseResponse
    {
        public DeslikeLivros DeslikeLivros { get; private set; }

        private DeslikeLivrosResponse(bool success, string message, DeslikeLivros deslikeLivros) : base(success, message)
        {
            DeslikeLivros = deslikeLivros;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved category.</param>
        /// <returns>Response.</returns>
        public DeslikeLivrosResponse(DeslikeLivros deslikeLivros) : this(true, string.Empty, deslikeLivros)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public DeslikeLivrosResponse(string message) : this(false, message, null)
        { }
    }
}
