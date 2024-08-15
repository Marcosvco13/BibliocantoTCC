using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bibliocanto.Migrations
{
    /// <inheritdoc />
    public partial class NovosCamposNaTabelaLivros : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CaminhoImagem",
                table: "Livros",
                type: "nvarchar(555)",
                maxLength: 555,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "isbn",
                table: "Livros",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Livros",
                keyColumn: "Id",
                keyValue: 100,
                columns: new[] { "CaminhoImagem", "isbn" },
                values: new object[] { "https://m.media-amazon.com/images/I/81M-QDE-7zL._SY425_.jpg", "978-6557172292" });

            migrationBuilder.UpdateData(
                table: "Livros",
                keyColumn: "Id",
                keyValue: 101,
                columns: new[] { "CaminhoImagem", "isbn" },
                values: new object[] { "https://m.media-amazon.com/images/I/916WkSH4cGL._SY425_.jpg", "978-8573266467" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CaminhoImagem",
                table: "Livros");

            migrationBuilder.DropColumn(
                name: "isbn",
                table: "Livros");
        }
    }
}
