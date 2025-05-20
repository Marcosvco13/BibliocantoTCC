using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bibliocanto.Migrations
{
    /// <inheritdoc />
    public partial class Bibliocanto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Denuncias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUser = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    IdResenha = table.Column<int>(type: "int", nullable: false),
                    IdComentario = table.Column<int>(type: "int", nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    DataDenuncia = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Denuncias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Perfil",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUser = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Apelido = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Descricao = table.Column<string>(type: "nvarchar(455)", maxLength: 455, nullable: true),
                    DataNasc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FotoPerfil = table.Column<string>(type: "nvarchar(455)", maxLength: 455, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Perfil", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Preferencias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUser = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    IdGenero = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Preferencias", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "AutoresLivro",
                keyColumn: "Id",
                keyValue: 1,
                column: "IdAutor",
                value: 100);

            migrationBuilder.UpdateData(
                table: "AutoresLivro",
                keyColumn: "Id",
                keyValue: 2,
                column: "IdAutor",
                value: 101);

            migrationBuilder.CreateIndex(
                name: "IX_Resenha_IdUser",
                table: "Resenha",
                column: "IdUser");

            migrationBuilder.AddForeignKey(
                name: "FK_Resenha_AspNetUsers_IdUser",
                table: "Resenha",
                column: "IdUser",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resenha_AspNetUsers_IdUser",
                table: "Resenha");

            migrationBuilder.DropTable(
                name: "Denuncias");

            migrationBuilder.DropTable(
                name: "Perfil");

            migrationBuilder.DropTable(
                name: "Preferencias");

            migrationBuilder.DropIndex(
                name: "IX_Resenha_IdUser",
                table: "Resenha");

            migrationBuilder.UpdateData(
                table: "AutoresLivro",
                keyColumn: "Id",
                keyValue: 1,
                column: "IdAutor",
                value: 101);

            migrationBuilder.UpdateData(
                table: "AutoresLivro",
                keyColumn: "Id",
                keyValue: 2,
                column: "IdAutor",
                value: 100);
        }
    }
}
