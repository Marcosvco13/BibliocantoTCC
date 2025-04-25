using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class PerfilResponse : BaseResponse
    {
        public Perfil Perfil { get; private set; }

        private PerfilResponse(bool success, string message, Perfil perfil) : base(success, message)
        {
            Perfil = perfil;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved category.</param>
        /// <returns>Response.</returns>
        public PerfilResponse(Perfil perfil) : this(true, string.Empty, perfil)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public PerfilResponse(string message) : this(false, message, null)
        { }
    }
}
