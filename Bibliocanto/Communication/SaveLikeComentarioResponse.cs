using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class LikeComentarioResponse : BaseResponse
    {
        public LikeComentario LikeComentario { get; private set; }

        private LikeComentarioResponse(bool success, string message, LikeComentario likeComentario) : base(success, message)
        {
            LikeComentario = likeComentario;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved category.</param>
        /// <returns>Response.</returns>
        public LikeComentarioResponse(LikeComentario likeComentario) : this(true, string.Empty, likeComentario)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public LikeComentarioResponse(string message) : this(false, message, null)
        { }
    }
}
