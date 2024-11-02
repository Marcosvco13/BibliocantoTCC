using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class ComentarioResponse : BaseResponse
    {
        public Comentarios Comentario { get; private set; }

        private ComentarioResponse(bool success, string message, Comentarios comentarios) : base(success, message)
        {
            Comentario = comentarios;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved category.</param>
        /// <returns>Response.</returns>
        public ComentarioResponse(Comentarios comentarios) : this(true, string.Empty, comentarios)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public ComentarioResponse(string message) : this(false, message, null)
        { }
    }
}
