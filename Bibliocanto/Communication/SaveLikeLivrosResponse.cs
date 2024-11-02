using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class LikeLivrosResponse : BaseResponse
    {
        public LikeLivros LikeLivros { get; private set; }

        private LikeLivrosResponse(bool success, string message, LikeLivros likeLivros) : base(success, message)
        {
            LikeLivros = likeLivros;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved category.</param>
        /// <returns>Response.</returns>
        public LikeLivrosResponse(LikeLivros likeLivros) : this(true, string.Empty, likeLivros)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public LikeLivrosResponse(string message) : this(false, message, null)
        { }
    }
}
