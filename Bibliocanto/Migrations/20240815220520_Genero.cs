using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Bibliocanto.Migrations
{
    /// <inheritdoc />
    public partial class Genero : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "generoid",
                table: "Livros",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Generos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nomegenero = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Generos", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "Generos",
                columns: new[] { "id", "nomegenero" },
                values: new object[,]
                {
                    { 100, "Ficção" },
                    { 101, "Economia" }
                });

            migrationBuilder.UpdateData(
                table: "Livros",
                keyColumn: "Id",
                keyValue: 100,
                column: "generoid",
                value: 101);

            migrationBuilder.UpdateData(
                table: "Livros",
                keyColumn: "Id",
                keyValue: 101,
                column: "generoid",
                value: 100);

            migrationBuilder.CreateIndex(
                name: "IX_Livros_generoid",
                table: "Livros",
                column: "generoid");

            migrationBuilder.AddForeignKey(
                name: "FK_Livros_Generos_generoid",
                table: "Livros",
                column: "generoid",
                principalTable: "Generos",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Livros_Generos_generoid",
                table: "Livros");

            migrationBuilder.DropTable(
                name: "Generos");

            migrationBuilder.DropIndex(
                name: "IX_Livros_generoid",
                table: "Livros");

            migrationBuilder.DropColumn(
                name: "generoid",
                table: "Livros");
        }
    }
}
