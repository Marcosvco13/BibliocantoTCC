using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class LikeResenhaResponse : BaseResponse
    {
        public LikeResenha LikeResenha { get; private set; }

        private LikeResenhaResponse(bool success, string message, LikeResenha likeResenha) : base(success, message)
        {
            LikeResenha = likeResenha;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved category.</param>
        /// <returns>Response.</returns>
        public LikeResenhaResponse(LikeResenha likeResenha) : this(true, string.Empty, likeResenha)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public LikeResenhaResponse(string message) : this(false, message, null)
        { }
    }
}
