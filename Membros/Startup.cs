using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Membros {
    public class Startup {
        readonly string AllowedOrigins = "allowedSpecificOrigins";

        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {            
            services.AddCors(options => {
                options.AddPolicy(AllowedOrigins,
                builder => {
                    builder.WithOrigins("http://membros.myvtmi.im",
                                        "https://membros.myvtmi.im",
                                        "http://painel-membros.myvtmi.im",
                                        "https://painel-membros.myvtmi.im",
                                        "https://localhost:5001",
                                        "http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod(); ;
                });
            });

            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors();

            app.Use((context, next) => {
                context.Items["__CorsMiddlewareInvoked"] = true;
                return next();
            });            

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers().RequireCors(AllowedOrigins);
            });
        }
    }
}
