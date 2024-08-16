using Bibliocanto.Models;

namespace Bibliocanto.Communication
{
    public class EditorasResponse : BaseResponse
    {
        public Editoras Editora { get; private set; }

        private EditorasResponse(bool success, string message, Editoras editora) : base(success, message)
        {
            Editora = editora;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="editoras">Saved generos.</param>
        /// <returns>Response.</returns>
        public EditorasResponse(Editoras editora) : this(true, string.Empty, editora)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public EditorasResponse(string message) : this(false, message, null)
        { }
    }
}
