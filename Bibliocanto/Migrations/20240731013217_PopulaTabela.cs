using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Bibliocanto.Migrations
{
    /// <inheritdoc />
    public partial class PopulaTabela : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "BaseLivros",
                columns: new[] { "Id", "IdAutor", "IdGenero", "NomeLivro" },
                values: new object[,]
                {
                    { 1, 1, 1, "Crime e Castigo" },
                    { 2, 2, 2, "Guerra do Velho" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "BaseLivros",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "BaseLivros",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
