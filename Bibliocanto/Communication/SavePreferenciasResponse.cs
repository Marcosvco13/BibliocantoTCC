using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class PreferenciasResponse : BaseResponse
    {
        public Preferencias Preferencia { get; private set; }

        private PreferenciasResponse(bool success, string message, Preferencias preferencias) : base(success, message)
        {
            Preferencia = preferencias;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="category">Saved category.</param>
        /// <returns>Response.</returns>
        public PreferenciasResponse(Preferencias preferencias) : this(true, string.Empty, preferencias)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public PreferenciasResponse(string message) : this(false, message, null)
        { }
    }
}
