<!DOCTYPE html>
<html lang="en">
    <head>
        @@include("./partials/title-meta.html", {"title": "Starter Page"})

        @@include('./partials/head-css.html')
    </head>

    @@include('./partials/body.html')
        <!-- Begin page -->
        <div class="wrapper">
            @@include('./partials/left-sidebar.html')

            <!-- ============================================================== -->
            <!-- Start Page Content here -->
            <!-- ============================================================== -->

            <div class="content-page">
                <div class="content">
                    @@include('./partials/topbar.html')

                    <!-- Start Content-->
                    <div class="container-fluid">
                        
                        <!-- start page title -->
                        @@include("./partials/page-title.html", {"subtitle":"Pages","title":"Starter"})
                        <!-- end page title --> 
                        
                        <h1>testsssvvccssxx</h1>

                    </div> <!-- container -->

                </div> <!-- content -->

                @@include('./partials/footer.html')

            </div>

            <!-- ============================================================== -->
            <!-- End Page content -->
            <!-- ============================================================== -->


        </div>
        <!-- END wrapper -->


        @@include('./partials/right-sidebar.html')


        <!-- bundle -->
        <script src="assets/js/vendor.min.js"></script>
        <script src="assets/js/app.min.js"></script>
        
    </body>
</html>
