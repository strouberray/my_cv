<?php
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: index.html");
    exit();
}

$fullname  = htmlspecialchars($_POST['fullname'] ?? 'Botanist');
$email     = htmlspecialchars($_POST['email'] ?? '');
$phone     = htmlspecialchars($_POST['phone'] ?? '');
$address   = htmlspecialchars($_POST['address'] ?? '');
$summary   = htmlspecialchars($_POST['summary'] ?? '');
$education = htmlspecialchars($_POST['education'] ?? '');
$skills    = htmlspecialchars($_POST['skills'] ?? '');

$photoData = "";
if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] == 0) {
    $imgBinary = file_get_contents($_FILES['profile_pic']['tmp_name']);
    $photoData = "data:" . $_FILES['profile_pic']['type'] . ";base64," . base64_encode($imgBinary);
} else {
    $photoData = "https://ui-avatars.com/api/?name=" . urlencode($fullname) . "&size=300&background=7fb069&color=fff";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $fullname; ?> | Organic Profile</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --forest: #2d4a22;
            --leaf: #7fb069;
            --sand: #fefae0;
            --wood: #bc6c25;
        }

        body {
            font-family: 'Quicksand', sans-serif;
            background-color: #fefae0;
            color: #283618;
            padding: 50px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .journal-page {
            max-width: 850px;
            width: 100%;
            background: #fff;
            border-radius: 40px 10px 40px 10px;
            overflow: hidden;
            box-shadow: 20px 20px 60px rgba(0,0,0,0.05);
            display: flex;
        }

        /* Sidebar Styling */
        .sidebar {
            width: 300px;
            background: #f9fbf2;
            padding: 60px 40px;
            border-right: 1px solid #e9edc9;
            text-align: center;
        }

        .profile-leaf {
            width: 180px;
            height: 180px;
            border-radius: 0 50% 0 50%; /* Leaf Shape */
            overflow: hidden;
            border: 4px solid var(--leaf);
            margin: 0 auto 30px;
        }

        .profile-leaf img { width: 100%; height: 100%; object-fit: cover; }

        .contact-info {
            text-align: left;
            margin-top: 40px;
            font-size: 13px;
        }

        .contact-row {
            margin-bottom: 15px;
            display: flex;
            gap: 12px;
            align-items: center;
        }

        .contact-row i { color: var(--leaf); }

        /* Content Styling */
        .main-content {
            padding: 60px;
            flex: 1;
        }

        h1 {
            font-family: 'Playfair Display', serif;
            font-size: 42px;
            color: var(--forest);
            margin-bottom: 5px;
        }

        .section-title {
            font-family: 'Playfair Display', serif;
            font-size: 20px;
            font-style: italic;
            color: var(--wood);
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-title::after {
            content: "";
            height: 1px;
            background: #ccd5ae;
            flex-grow: 1;
        }

        .text-block {
            font-size: 15px;
            line-height: 1.8;
            margin-bottom: 40px;
            white-space: pre-line;
        }

        .skill-tag {
            display: inline-block;
            background: #e9edc9;
            color: var(--forest);
            padding: 6px 16px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 700;
            margin: 0 8px 8px 0;
        }

        .controls {
            margin-top: 40px;
            display: flex;
            gap: 15px;
        }

        .btn {
            padding: 12px 25px;
            border-radius: 50px;
            font-weight: 700;
            text-decoration: none;
            transition: 0.3s;
            cursor: pointer;
            border: none;
        }

        .btn-green { background: var(--forest); color: white; }
        .btn-soft { background: #ccd5ae; color: var(--forest); }

        @media print {
            .controls { display: none; }
            body { padding: 0; background: white; }
            .journal-page { box-shadow: none; border-radius: 0; }
        }
    </style>
</head>
<body>

    <div class="journal-page">
        <aside class="sidebar">
            <div class="profile-leaf">
                <img src="<?php echo $photoData; ?>" alt="Profile">
            </div>
            <div class="contact-info">
                <div class="contact-row"><i class="fa-solid fa-envelope"></i> <?php echo $email; ?></div>
                <div class="contact-row"><i class="fa-solid fa-phone"></i> <?php echo $phone; ?></div>
                <div class="contact-row"><i class="fa-solid fa-location-dot"></i> <?php echo $address; ?></div>
            </div>
        </aside>

        <main class="main-content">
            <h1><?php echo $fullname; ?></h1>
            <p style="color: var(--leaf); font-weight: 600; margin-bottom: 40px;">Creative Individual // Nature Enthusiast</p>

            <section>
                <h2 class="section-title">Personal Growth</h2>
                <div class="text-block"><?php echo $summary; ?></div>
            </section>

            <section>
                <h2 class="section-title">Academic Roots</h2>
                <div class="text-block"><?php echo $education; ?></div>
            </section>

            <section>
                <h2 class="section-title">Cultivated Skills</h2>
                <div>
                    <?php 
                    $skillsList = explode(',', $skills);
                    foreach($skillsList as $s) {
                        if(trim($s) != "") echo '<span class="skill-tag">' . trim($s) . '</span>';
                    }
                    ?>
                </div>
            </section>
        </main>
    </div>

    <div class="controls">
        <button class="btn btn-green" onclick="window.print()">Export to PDF</button>
        <a href="index.html" class="btn btn-soft">Edit Profile</a>
    </div>

</body>
</html>
