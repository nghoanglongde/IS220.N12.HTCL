using backend.Models;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using backend.Helpers;

namespace backend {
    public class Startup {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CloudinarySettings>(Configuration.GetSection("Cloudinary"));
            services.Configure<MongoDBSettings>(Configuration.GetSection("FrameworkDatabase"));
            services.AddScoped<CLOUDINARY_SERVICE>();
            services.AddSingleton<MongoDBContext>();
            services.AddSingleton<USERS_SERVICE>();
            services.AddSingleton<POSTS_SERVICE>();
            services.AddSingleton<POST_COMMENTS_SERVICE>();
            services.AddSingleton<NOTIFICATIONS_SERVICE>();
            services.AddSingleton<CATEGORIES_SERVICE>();
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                    {
                        builder.WithOrigins("http://localhost:3001", "http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    });
            });
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.Configure<KestrelServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            }); ;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseCors();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "/{controller}/{action}"
                );
            });
        }
    }
}
