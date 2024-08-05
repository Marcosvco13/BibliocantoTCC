using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Bibliocanto.Migrations
{
    /// <inheritdoc />
    public partial class AtuTabela : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BaseLivros");

            migrationBuilder.CreateTable(
                name: "Livros",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomeLivro = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    IdAutor = table.Column<int>(type: "int", nullable: false),
                    IdGenero = table.Column<int>(type: "int", nullable: false),
                    CaminhoImagem = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    IdEditora = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Livros", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Livros",
                columns: new[] { "Id", "CaminhoImagem", "IdAutor", "IdEditora", "IdGenero", "NomeLivro" },
                values: new object[,]
                {
                    { 1, "https://m.media-amazon.com/images/I/612oPQzTN7L._SY466_.jpg", 1, 1, 1, "Crime e Castigo" },
                    { 2, "https://m.media-amazon.com/images/I/612oPQzTN7L._SY466_.jpg", 2, 2, 2, "Guerra do Velho" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Livros");

            migrationBuilder.CreateTable(
                name: "BaseLivros",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdAutor = table.Column<int>(type: "int", nullable: false),
                    IdGenero = table.Column<int>(type: "int", nullable: false),
                    NomeLivro = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaseLivros", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "BaseLivros",
                columns: new[] { "Id", "IdAutor", "IdGenero", "NomeLivro" },
                values: new object[,]
                {
                    { 1, 1, 1, "Crime e Castigo" },
                    { 2, 2, 2, "Guerra do Velho" }
                });
        }
    }
}
