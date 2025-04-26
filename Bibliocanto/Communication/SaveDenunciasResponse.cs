using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class DenunciasResponse : BaseResponse
    {
        public Denuncias Denuncias { get; private set; }

        private DenunciasResponse(bool success, string message, Denuncias denuncia) : base(success, message)
        {
            Denuncias = denuncia;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved category.</param>
        /// <returns>Response.</returns>
        public DenunciasResponse(Denuncias denuncia) : this(true, string.Empty, denuncia)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public DenunciasResponse(string message) : this(false, message, null)
        { }
    }
}
