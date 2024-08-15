using AutoMapper;
using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class GenerosResponse : BaseResponse
    {
        public Generos Genero { get; private set; }

        private GenerosResponse(bool success, string message, Generos genero) : base(success, message)
        {
            Genero = genero;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="generos">Saved generos.</param>
        /// <returns>Response.</returns>
        public GenerosResponse(Generos genero) : this(true, string.Empty, genero)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public GenerosResponse(string message) : this(false, message, null)
        { }
    }
}
