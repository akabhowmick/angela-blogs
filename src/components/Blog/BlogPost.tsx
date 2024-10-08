import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { BlogPostInfo } from "../../types/interfaces";

export const BlogPost = ({ post }: { post: BlogPostInfo }) => {
  const { _id, title, summary, cover, content, createdAt, author } = post;

  // Styled components to match the card styles
  const StyledCard = styled(Card)({
    border: "1px solid",
    borderColor: "divider",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.02)",
    },
  });

  const StyledCardContent = styled(CardContent)({
    padding: "16px",
  });

  const StyledTypography = styled(Typography)({
    marginBottom: "12px",
  });

  return (
    <Grid size={{ xs: 12, md: 6 }} key={_id}>
      <StyledCard variant="outlined">
        <Link to={`/post/${_id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            component="img"
            alt={title}
            image={`http://localhost:4000/${cover}`}
            sx={{
              aspectRatio: "16 / 9",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          />
        </Link>
        <StyledCardContent>
          <Typography variant="caption" color="text.secondary">
            By {author.username} | <time>{formatISO9075(new Date(createdAt))}</time>
          </Typography>
          <Typography variant="h6" component="div">
            <Link to={`/post/${_id}`} style={{ textDecoration: "none", color: "inherit" }}>
              {title}
            </Link>
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {summary}
          </StyledTypography>
          {/* TODO limit the characters here */}
          <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
        </StyledCardContent>
      </StyledCard>
    </Grid>
  );
};
