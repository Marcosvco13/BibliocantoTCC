using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.ViewModels
{
    public class ResetPasswordRequest
    {
        public string Email { get; set; }
        public string Code { get; set; }
        [Required(ErrorMessage = "A senha é obrigatória")]
        [StringLength(20, ErrorMessage = "A {0} deve ter no mínimo {2} e no máximo {1} caracteres.", MinimumLength = 10)]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }
    }
}
